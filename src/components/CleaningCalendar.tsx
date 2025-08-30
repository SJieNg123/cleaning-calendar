"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
import { addWeeks, startOfWeek, format, isSameDay, addDays } from "date-fns";

interface CleaningTask {
  person: string;
  place: string;
  date: Date;
  weekNumber: number;
}

interface Person {
  id: number;
  name: string;
  schedule: string[];
}

// const PLACES = ["客廳", "小厠所", "厨房+走廊", "大厠所"];
const PEOPLE_SCHEDULES = [
  ["大厠所", "客廳", "小厠所", "厨房+走廊"], // shi jie
  ["小厠所", "厨房+走廊", "大厠所", "客廳"], // hai yan
  ["厨房+走廊", "大厠所", "客廳", "小厠所"], // ming kang
  ["客廳", "小厠所", "厨房+走廊", "大厠所"] // zhang ning
];

export default function CleaningCalendar() {
  const [selectedPerson, setSelectedPerson] = useState<string>("");
  const [personNames, setPersonNames] = useState<Person[]>([
    { id: 1, name: "Shi Jie", schedule: PEOPLE_SCHEDULES[0] },
    { id: 2, name: "Hai Yan", schedule: PEOPLE_SCHEDULES[1] },
    { id: 3, name: "Ming Kang", schedule: PEOPLE_SCHEDULES[2] },
    { id: 4, name: "Zhang Ning", schedule: PEOPLE_SCHEDULES[3] },
  ]);
  const [cleaningTasks, setCleaningTasks] = useState<CleaningTask[]>([]);
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());

  // Generate cleaning tasks for the next 16 weeks with alternating pattern
  useEffect(() => {
    const tasks: CleaningTask[] = [];
    // Start from August 25, 2025 (Monday)
    const startDate = new Date(2025, 7, 25); // Month is 0-indexed, so 7 = August
    const startWeek = startOfWeek(startDate, { weekStartsOn: 1 }); // Start from Monday

    for (let week = 0; week < 16; week++) {
      const weekStart = addWeeks(startWeek, week);
      
      // Only create tasks for odd-numbered weeks (1, 3, 5, 7, etc.)
      if (week % 2 === 0) {
        personNames.forEach((person, personIndex) => {
          const placeIndex = Math.floor(week / 2) % 4; // This ensures the rotation continues properly
          const place = person.schedule[placeIndex];
          
          // Each person cleans on a different day of the week
          const cleaningDay = addDays(weekStart, personIndex);
          
          tasks.push({
            person: person.name,
            place: place,
            date: cleaningDay,
            weekNumber: week + 1,
          });
        });
      }
    }

    setCleaningTasks(tasks);
  }, [personNames]);

  const handlePersonSelect = (personId: string) => {
    setSelectedPerson(personId);
  };



  const getTasksForSelectedPerson = () => {
    if (!selectedPerson) return [];
    return cleaningTasks.filter(task => task.person === selectedPerson);
  };

  /*
  const getTasksForDate = (date: Date) => {
    return cleaningTasks.filter(task => isSameDay(task.date, date));
  };
  */

  const getTasksForWeek = (date: Date) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const weekEnd = addDays(weekStart, 6);
    
    // Find all tasks that fall within this week
    const weekTasks = cleaningTasks.filter(task => 
      task.date >= weekStart && task.date <= weekEnd
    );
    
    return weekTasks;
  };

  const isCleaningWeek = (date: Date) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const startDate = new Date(2025, 7, 25); // August 25, 2025
    const startWeek = startOfWeek(startDate, { weekStartsOn: 1 });
    
    // Calculate which week this is from the start
    const weeksDiff = Math.floor((weekStart.getTime() - startWeek.getTime()) / (7 * 24 * 60 * 60 * 1000));
    
    // Cleaning weeks are odd-numbered (0-indexed, so weeks 0, 2, 4, 6, etc.)
    return weeksDiff >= 0 && weeksDiff % 2 === 0;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Home Cleaning Calendar</CardTitle>
          <CardDescription>
            Manage your alternating week cleaning schedule starting from August 25, 2025. 
            Cleaning occurs every other week (Week 1, 3, 5, etc.) with 4 people and 4 places.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Person Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Person</h3>
            <Select value={selectedPerson} onValueChange={handlePersonSelect}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Choose a person " />
              </SelectTrigger>
              <SelectContent>
                {personNames.map((person) => (
                  <SelectItem key={person.id} value={person.name}>
                    {person.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>



          {/* Schedule Display */}
          {selectedPerson && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Cleaning Schedule</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {getTasksForSelectedPerson().map((task, index) => (
                  <Card key={index} className="border-2 border-blue-200">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">Week {task.weekNumber}</div>
                        <div className="text-sm text-gray-600">
                          {format(task.date, "MMM dd, yyyy")}
                        </div>
                        <div className="text-lg font-bold text-blue-600 mt-2">
                          {task.place}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Full Schedule Table */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Complete Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Week</th>
                    {personNames.map((person) => (
                      <th key={person.id} className="border border-gray-300 p-2">
                        {person.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 16 }, (_, weekIndex) => (
                    <tr key={weekIndex} className={weekIndex % 2 === 1 ? 'bg-gray-50' : ''}>
                      <td className="border border-gray-300 p-2 font-semibold">
                        Week {weekIndex + 1}
                        {weekIndex % 2 === 1 && <span className="text-gray-500 text-xs block">(No cleaning)</span>}
                      </td>
                      {personNames.map((person, personIndex) => {
                        const task = cleaningTasks.find(
                          t => t.person === person.name && t.weekNumber === weekIndex + 1
                        );
                        return (
                          <td 
                            key={personIndex} 
                            className={`border border-gray-300 p-2 text-center ${
                              task?.person === selectedPerson ? 'bg-blue-100' : ''
                            }`}
                          >
                            {task ? task.place : '-'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Calendar */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Calendar View</h3>
            <div className="border rounded-lg p-4">
              <Calendar
                mode="single"
                selected={currentWeek}
                onSelect={(date) => date && setCurrentWeek(date)}
                className="rounded-md border"
              />
            </div>
            {/* Show tasks for selected week */}
            {currentWeek && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">
                  Tasks for week of {format(startOfWeek(currentWeek, { weekStartsOn: 1 }), "MMMM dd")} - {format(addDays(startOfWeek(currentWeek, { weekStartsOn: 1 }), 6), "MMMM dd, yyyy")}:
                </h4>
                {isCleaningWeek(currentWeek) ? (
                  <div className="space-y-2">
                    {getTasksForWeek(currentWeek).map((task, index) => (
                      <div 
                        key={index} 
                        className={`p-2 rounded ${
                          task.person === selectedPerson 
                            ? 'bg-blue-100 border border-blue-300' 
                            : 'bg-gray-100 border border-gray-300'
                        }`}
                      >
                        <strong>{task.person}</strong>: {task.place} 
                        <span className="text-sm text-gray-600 ml-2">
                          ({format(task.date, "EEEE")})
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-gray-100 border border-gray-300 rounded text-center text-gray-600">
                    No cleaning job for this week
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Legend</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                <span className="text-sm">Your tasks</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                <span className="text-sm">Other people tasks</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
