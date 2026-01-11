'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CustomBtn } from '@/components/shared/CustomBtn';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCars, useToggleFeatured, useToggleAvailability } from '@/lib/hooks/useCars';
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Star,
  Power,
  Car as CarIcon
} from 'lucide-react';
import Image from 'next/image';
import { AddCarModal } from './AddCarModal';


export function CarsListingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [conditionFilter, setConditionFilter] = useState<string>('all');
  const [addModalOpen, setAddModalOpen] = useState(false);

  const { data: cars, isLoading } = useCars();
  const toggleFeatured = useToggleFeatured();
  const toggleAvailability = useToggleAvailability();

  const filteredCars = cars?.filter(car => {
    const matchesSearch =
      car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSource = sourceFilter === 'all' || car.source === sourceFilter;
    const matchesCondition = conditionFilter === 'all' || car.condition === conditionFilter;

    return matchesSearch && matchesSource && matchesCondition;
  });

  return (
    <div>
      <Header
        title="Car Listings"
      // description="Manage car inventory from API and manual entries"
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Summary Stats */}
        {cars && (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{cars.length}</div>
                <p className="text-sm text-muted-foreground">Total Cars</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {cars.filter(c => c.available).length}
                </div>
                <p className="text-sm text-muted-foreground">Available</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {cars.filter(c => c.source === 'api').length}
                </div>
                <p className="text-sm text-muted-foreground">API Cars</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {cars.filter(c => c.featured).length}
                </div>
                <p className="text-sm text-muted-foreground">Featured</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by make, model, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">


                  <Select value={sourceFilter} onValueChange={setSourceFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="api">API Only</SelectItem>
                      <SelectItem value="manual">Manual Only</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={conditionFilter} onValueChange={setConditionFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Conditions</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                      <SelectItem value="certified">Certified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <CustomBtn
                  icon={Plus}
                  onClick={() => setAddModalOpen(true)}
                  className='bg-emerald-600 text-white rounded-lg hover:bg-emerald-700'
                >
                  Add Car Manually
                </CustomBtn>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cars Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <LoadingSpinner text="Loading cars..." />
            ) : filteredCars && filteredCars.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-50">Car</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead className="hidden md:table-cell">Mileage</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCars.map((car) => (
                      <TableRow key={car.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-16 rounded overflow-hidden bg-muted shrink-0">
                              {car.images[0] ? (
                                <Image
                                  src={car.images[0]}
                                  alt={`${car.make} ${car.model}`}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <CarIcon className="h-6 w-6 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium flex items-center gap-2">
                                <span className="truncate">
                                  {car.make} {car.model}
                                </span>
                                {car.featured && (
                                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 shrink-0" />
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {car.year}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          ${car.price.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={car.condition} />
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm">
                          {car.mileage ? `${car.mileage.toLocaleString()} mi` : 'N/A'}
                        </TableCell>
                        <TableCell className="text-sm">{car.location}</TableCell>
                        <TableCell>
                          <StatusBadge status={car.source === 'api' ? 'active' : 'inactive'} />

                        </TableCell>
                        <TableCell>

                          <StatusBadge status={car.source === 'api' ? 'active' : 'inactive'} />

                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                type="button"
                                className="h-8 w-8 p-0 flex items-center justify-center rounded hover:bg-gray-100 cursor-pointer"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="z-50">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => router.push(`/admin/cars/${car.id}`)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => router.push(`/cars/${car.id}/edit`)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Car
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => toggleFeatured.mutate(car.id)}>
                                <Star className="mr-2 h-4 w-4" />
                                {car.featured ? 'Unfeature' : 'Feature'}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleAvailability.mutate(car.id)}>
                                <Power className="mr-2 h-4 w-4" />
                                Mark as {car.available ? 'Sold' : 'Available'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <EmptyState
                icon={CarIcon}
                title="No cars found"
                description={searchQuery ? "Try adjusting your search" : "Start by adding your first car"}
                action={{
                  label: "Add Car",
                  onClick: () => setAddModalOpen(true),
                  icon: Plus,
                }}
              />
            )}
          </CardContent>
        </Card>


      </div>

      {/* Add Car Modal */}
      <AddCarModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
      />
    </div>
  );
}

