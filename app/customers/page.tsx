"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, Pencil, Trash2, Mail, Calendar, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Customer = {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  lastOrder: string;
  totalSpent: string;
};

const initialCustomers: Customer[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "active",
    lastOrder: "2024-03-15",
    totalSpent: "$1,234.56",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    status: "active",
    lastOrder: "2024-03-10",
    totalSpent: "$987.65",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol@example.com",
    status: "inactive",
    lastOrder: "2024-02-28",
    totalSpent: "$432.10",
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleAddCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCustomer: Customer = {
      id: Math.random().toString(36).substring(7),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      status: "active",
      lastOrder: new Date().toISOString().split("T")[0],
      totalSpent: "$0.00",
    };
    setCustomers([...customers, newCustomer]);
    setIsDialogOpen(false);
  };

  const handleEditCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCustomer) return;
    
    const formData = new FormData(e.currentTarget);
    const updatedCustomers = customers.map((customer) =>
      customer.id === editingCustomer.id
        ? {
            ...customer,
            name: formData.get("name") as string,
            email: formData.get("email") as string,
          }
        : customer
    );
    setCustomers(updatedCustomers);
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  const CustomerForm = ({ customer }: { customer?: Customer }) => (
    <form onSubmit={customer ? handleEditCustomer : handleAddCustomer} className="space-y-4">
      <div className="grid w-full gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={customer?.name}
          placeholder="Enter customer name"
          required
        />
      </div>
      <div className="grid w-full gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={customer?.email}
          placeholder="Enter customer email"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {customer ? "Update Customer" : "Add Customer"}
      </Button>
    </form>
  );

  const CustomerDetails = ({ customer }: { customer: Customer }) => (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-3xl font-semibold text-primary">
            {customer.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold">{customer.name}</h3>
          <Badge
            variant={customer.status === "active" ? "default" : "secondary"}
            className="mt-2"
          >
            {customer.status}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{customer.email}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Last Order: {customer.lastOrder}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          <span>Total Spent: {customer.totalSpent}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage your customer relationships
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <CustomerForm />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow 
                key={customer.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedCustomer(customer)}
              >
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={customer.status === "active" ? "default" : "secondary"}
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell>{customer.lastOrder}</TableCell>
                <TableCell>{customer.totalSpent}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Customer</DialogTitle>
                          </DialogHeader>
                          <CustomerForm customer={customer} />
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}