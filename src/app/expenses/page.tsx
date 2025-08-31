"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Plus, Edit, Trash2, Calendar } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

interface Expense {
  id: string;
  description: string;
  amount: number;
  billingCycle: "monthly" | "bimonthly";
  date: string;
  category: string;
}

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
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    billingCycle: "monthly" as "monthly" | "bimonthly",
    date: "",
    category: "other",
  });

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem("homeManagerExpenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("homeManagerExpenses", JSON.stringify(expenses));
  }, [expenses]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount || !formData.date) {
      alert("Please fill in all required fields");
      return;
    }

    const newExpense: Expense = {
      id: editingExpense?.id || Date.now().toString(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      billingCycle: formData.billingCycle,
      date: formData.date,
      category: formData.category,
    };

    if (editingExpense) {
      setExpenses(expenses.map(exp => exp.id === editingExpense.id ? newExpense : exp));
    } else {
      setExpenses([...expenses, newExpense]);
    }

    resetForm();
  };

  const handleEdit = (expense: Expense) => {
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

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      setExpenses(expenses.filter(exp => exp.id !== id));
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t("expenses.title")}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t("expenses.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("expenses.monthlyTotal")}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${totals.monthlyTotal.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ${totals.monthlyPerPerson.toFixed(2)} {t("expenses.perPerson")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("expenses.bimonthlyTotal")}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${totals.bimonthlyTotal.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ${totals.bimonthlyPerPerson.toFixed(2)} {t("expenses.perPerson")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("expenses.grandTotal")}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${totals.grandTotal.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
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
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("expenses.addExpense")}
          </Button>
        </div>

        {/* Add/Edit Expense Form */}
        {isAddingExpense && (
          <Card className="bg-white dark:bg-gray-800 shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                {editingExpense ? t("expenses.edit") : t("expenses.addExpense")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                       {t("expenses.descriptionLabel")}
                     </label>
                    <Input
                      value={formData.description}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter expense description"
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t("expenses.amount")}
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t("expenses.billingCycle")}
                    </label>
                    <Select
                      value={formData.billingCycle}
                      onValueChange={(value: "monthly" | "bimonthly") => 
                        setFormData({ ...formData, billingCycle: value })
                      }
                    >
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">{t("expenses.monthly")}</SelectItem>
                        <SelectItem value="bimonthly">{t("expenses.bimonthly")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t("expenses.date")}
                    </label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, date: e.target.value })}
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
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
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    {t("expenses.save")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="dark:border-gray-600 dark:text-gray-300"
                  >
                    {t("expenses.cancel")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Expenses List */}
        <Card className="bg-white dark:bg-gray-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              {t("expenses.title")}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {expenses.length === 0 ? t("expenses.noExpenses") : `${expenses.length} expenses recorded`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {expenses.length === 0 ? (
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  {t("expenses.noExpenses")}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  {t("expenses.addFirstExpense")}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                                             <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                         {t("expenses.descriptionLabel")}
                       </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                        {t("expenses.amount")}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                        {t("expenses.billingCycle")}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                        {t("expenses.date")}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                        {t("expenses.perPerson")}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                        {t("expenses.actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-3 px-4 text-gray-900 dark:text-white">
                          {expense.description}
                        </td>
                        <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                          ${expense.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {t(`expenses.${expense.billingCycle}`)}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {new Date(expense.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          ${(expense.amount / 4).toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(expense)}
                              className="dark:border-gray-600 dark:text-gray-300"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(expense.id)}
                              className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20"
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
