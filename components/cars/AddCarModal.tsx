'use client';

import { useState } from 'react';
import { useCreateCar } from '@/lib/hooks/useCars';
import { CarCondition } from '@/types';
import { Modal } from '../shared';
import { FormField, SelectField, TextAreaField } from '@/components/Form';
import { Switch } from '@nextui-org/react';
import {
  MakeSchema,
  ModelSchema,
  YearSchema,
  PriceSchema,
  MileageSchema,
  RequiredSchema,
} from '@/lib/schema';
import { useField } from '@/lib';
import MediaUpload from '../shared/MediaFilepload';

const conditionOptions = [
  { value: "NEW", label: "New" },
  { value: "USED", label: "Used" },
  { value: "CERTIFIED", label: "Certified" },
];

const sourceOptions = [
  { value: "api", label: "API" },
  { value: "manual", label: "Manual" },
];

interface AddCarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export function AddCarModal({ open, onOpenChange }: AddCarModalProps) {

  const createCar = useCreateCar();


  const { value: make, error: makeError, handleChange: handleMakeChange } =
    useField('', MakeSchema);

  const { value: model, error: modelError, handleChange: handleModelChange } =
    useField('', ModelSchema);

  const { value: year, error: yearError, handleChange: handleYearChange } =
    useField(String(new Date().getFullYear()), YearSchema);

  const { value: price, error: priceError, handleChange: handlePriceChange } =
    useField('', PriceSchema);

  const {
    value: mileage,
    error: mileageError,
    handleChange: handleMileageChange,
  } = useField('0', MileageSchema);

  const {
    value: location,
    error: locationError,
    handleChange: handleLocationChange,
  } = useField('', RequiredSchema('Location'));

  const {
    value: country,
    error: countryError,
    handleChange: handleCountryChange,
  } = useField('', RequiredSchema('Country'));

  const {
    value: description,
    error: descriptionError,
    handleChange: handleDescriptionChange,
  } = useField('', RequiredSchema('Description'));

  const [condition, setCondition] = useState<CarCondition | "">("");
  const [conditionError, setConditionError] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);
  const [available, setAvailable] = useState(true);

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append('make', make);
    formData.append('model', model);
    formData.append('year', String(year));
    formData.append('price', String(price));
    formData.append('mileage', String(mileage));
    formData.append('location', location);
    formData.append('country', country);
    formData.append('description', description);
    formData.append('condition', condition);
    formData.append('featured', String(featured));
    formData.append('available', String(available));
    formData.append('source', 'manual');

    if (image) {
      formData.append('images', image); // 👈 matches backend field
    }

    createCar.mutate(formData, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Add New Car"
      description="Add a car listing manually to your inventory"
      size="lg"
      showFooter
      onConfirm={handleSubmit}
      confirmText="Add Car"
      isLoading={createCar.isPending}
    >
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Make"
            id="make"
            type='text'
            htmlFor="make"
            placeholder="Toyota"
            value={make}
            onChange={handleMakeChange}
            isInvalid={!!makeError}
            errorMessage={makeError}
            reqValue="*"
          />

          <FormField
            label="Model"
            id="model"
            type='text'
            htmlFor="model"
            placeholder="Corolla"
            value={model}
            onChange={handleModelChange}
            isInvalid={!!modelError}
            errorMessage={modelError}
            reqValue="*"
          />

          <FormField
            label="Year"
            id="year"
            htmlFor="year"
            type="number"
            value={year}
            onChange={handleYearChange}
            isInvalid={!!yearError}
            errorMessage={yearError}
            reqValue="*"
          />

          <FormField
            label="Price"
            id="price"
            htmlFor="price"
            type="number"
            value={price}
            onChange={handlePriceChange}
            isInvalid={!!priceError}
            errorMessage={priceError}
            reqValue="*"
          />

          <SelectField
            label="Condition"
            htmlFor="consdition"
            id="condition"
            placeholder="Select Condition"
            isInvalid={!!conditionError}
            errorMessage={conditionError}
            value={condition}
            onChange={(value: string) => {
              setCondition(value as CarCondition);
              setConditionError("");
            }}
            options={conditionOptions}
            required
            reqValue="*"

          />

          <FormField
            label="Mileage"
            id="mileage"
            htmlFor="mileage"
            type="number"
            value={mileage}
            onChange={handleMileageChange}
            isInvalid={!!mileageError}
            errorMessage={mileageError}
          />

          <FormField
            label="Location"
            id="location"
            type='text'
            htmlFor="location"
            value={location}
            onChange={handleLocationChange}
            isInvalid={!!locationError}
            errorMessage={locationError}
            reqValue="*"
          />

          <FormField
            label="Country"
            id="country"
            type='text'
            htmlFor="country"
            value={country}
            onChange={handleCountryChange}
            isInvalid={!!countryError}
            errorMessage={countryError}
            reqValue="*"
          />
        </div>

        <TextAreaField
          label="Description"
          id="description"
          htmlFor="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder='Enter car description'
          isInvalid={!!descriptionError}
          errorMessage={descriptionError}
          required
        />

        <MediaUpload
          onFileSelect={(file) => {
            setImage(file);
          }}
        />


        <div className="flex items-center justify-between p-4 border rounded-lg">
          <span>Feature this car</span>
          <Switch
            isSelected={featured}
            onValueChange={setFeatured}
          />


        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <span>Available for purchase</span>
          <Switch
            isSelected={available}
            onValueChange={setAvailable}
          />

        </div>
      </div>
    </Modal>
  );
}
