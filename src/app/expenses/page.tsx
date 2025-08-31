"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Plus, Edit, Trash2, Calendar } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import { getExpenses, addExpense, updateExpense, deleteExpense, Expense as FirebaseExpense } from "@/lib/firebaseService";

// Remove the local Expense interface since we're using FirebaseExpense

const expenseCategories = [
  { value: "rentalFee", label: "expenses.rentalFee" },
  { value: "wifiBill", label: "expenses.wifiBill" },
  { value: "waterBill", label: "expenses.waterBill" },
  { value: "electricityBill", label: "expenses.electricityBill" },
  { value: "gasBill", label: "expenses.gasBill" },
  { value: "other", label: "expenses.other" },
];

export default function ExpensesPage() {
  const { t } = useSettings();
  const [expenses, setExpenses] = useState<FirebaseExpense[]>([]);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState<FirebaseExpense | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    billingCycle: "monthly" as "monthly" | "bimonthly",
    date: "",
    category: "other",
  });

  // Load expenses from Firebase on component mount
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        setLoading(true);
        const firebaseExpenses = await getExpenses();
        setExpenses(firebaseExpenses);
      } catch (error) {
        console.error('Error loading expenses:', error);
        // Fallback to localStorage if Firebase fails
        const savedExpenses = localStorage.getItem("homeManagerExpenses");
        if (savedExpenses) {
          setExpenses(JSON.parse(savedExpenses));
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadExpenses();
  }, []);

  const resetForm = () => {
    setFormData({
      description: "",
      amount: "",
      billingCycle: "monthly",
      date: "",
      category: "other",
    });
    setIsAddingExpense(false);
    setEditingExpense(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount || !formData.date) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const expenseData = {
        description: formData.description,
        amount: parseFloat(formData.amount),
        billingCycle: formData.billingCycle,
        date: formData.date,
        category: formData.category,
      };

      if (editingExpense) {
        await updateExpense(editingExpense.id!, expenseData);
        setExpenses(expenses.map(exp => exp.id === editingExpense.id ? { ...exp, ...expenseData } : exp));
      } else {
        const newExpense = await addExpense(expenseData);
        setExpenses([newExpense, ...expenses]);
      }

      resetForm();
    } catch (error) {
      console.error('Error saving expense:', error);
      alert('Failed to save expense. Please try again.');
    }
  };

  const handleEdit = (expense: FirebaseExpense) => {
    setEditingExpense(expense);
    setFormData({
      description: expense.description,
      amount: expense.amount.toString(),
      billingCycle: expense.billingCycle,
      date: expense.date,
      category: expense.category,
    });
    setIsAddingExpense(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id);
        setExpenses(expenses.filter(exp => exp.id !== id));
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense. Please try again.');
      }
    }
  };

  const calculateTotals = () => {
    const monthlyExpenses = expenses.filter(exp => exp.billingCycle === "monthly");
    const bimonthlyExpenses = expenses.filter(exp => exp.billingCycle === "bimonthly");
    
    const monthlyTotal = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const bimonthlyTotal = bimonthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const grandTotal = monthlyTotal + bimonthlyTotal;
    
    return {
      monthlyTotal,
      bimonthlyTotal,
      grandTotal,
      monthlyPerPerson: monthlyTotal / 4,
      bimonthlyPerPerson: bimonthlyTotal / 4,
      grandPerPerson: grandTotal / 4,
    };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-card rounded-lg shadow-sm">
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {t("expenses.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("expenses.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("expenses.monthlyTotal")}</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${totals.monthlyTotal.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${totals.monthlyPerPerson.toFixed(2)} {t("expenses.perPerson")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("expenses.bimonthlyTotal")}</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${totals.bimonthlyTotal.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${totals.bimonthlyPerPerson.toFixed(2)} {t("expenses.perPerson")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("expenses.grandTotal")}</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${totals.grandTotal.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${totals.grandPerPerson.toFixed(2)} {t("expenses.perPerson")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Expense Button */}
        <div className="mb-6">
          <Button
            onClick={() => setIsAddingExpense(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("expenses.addExpense")}
          </Button>
        </div>

        {/* Add/Edit Expense Form */}
        {isAddingExpense && (
          <Card className="bg-card shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="text-foreground">
                {editingExpense ? t("expenses.edit") : t("expenses.addExpense")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("expenses.descriptionLabel")}
                    </label>
                    <Input
                      value={formData.description}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter expense description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("expenses.amount")}
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("expenses.billingCycle")}
                    </label>
                    <Select
                      value={formData.billingCycle}
                      onValueChange={(value: "monthly" | "bimonthly") => 
                        setFormData({ ...formData, billingCycle: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">{t("expenses.monthly")}</SelectItem>
                        <SelectItem value="bimonthly">{t("expenses.bimonthly")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("expenses.date")}
                    </label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {expenseCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {t(category.label)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    {t("expenses.save")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                  >
                    {t("expenses.cancel")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Expenses List */}
        <Card className="bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">
              {t("expenses.title")}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {loading ? "Loading..." : (expenses.length === 0 ? t("expenses.noExpenses") : `${expenses.length} expenses recorded`)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading expenses...</p>
              </div>
            ) : expenses.length === 0 ? (
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">
                  {t("expenses.noExpenses")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("expenses.addFirstExpense")}
                </p>
              </div>
            ) : (
                            <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        {t("expenses.descriptionLabel")}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        {t("expenses.amount")}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        {t("expenses.billingCycle")}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        {t("expenses.date")}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        {t("expenses.perPerson")}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        {t("expenses.actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 text-foreground">
                          {expense.description}
                        </td>
                        <td className="py-3 px-4 text-foreground font-medium">
                          ${expense.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {t(`expenses.${expense.billingCycle}`)}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {new Date(expense.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          ${(expense.amount / 4).toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(expense)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => expense.id && handleDelete(expense.id)}
                              className="text-destructive border-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
