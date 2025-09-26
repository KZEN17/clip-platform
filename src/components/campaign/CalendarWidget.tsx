"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, RefreshCw } from "lucide-react";

interface CalendarWidgetProps {
  selectedDate: number;
  selectedMonth: number;
  selectedYear: number;
  datesWithEvents: number[];
  loading: boolean;
  onDateSelect: (date: number) => void;
  onRefresh: () => void;
}

export const CalendarWidget = ({
  selectedDate,
  selectedMonth,
  selectedYear,
  datesWithEvents,
  loading,
  onDateSelect,
  onRefresh,
}: CalendarWidgetProps) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const generateCalendarDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-400" />
          Launch Calendar
        </CardTitle>
        {!loading && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            className="text-gray-400 hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>

      <CardContent>
        <div className="text-center mb-6">
          <h4 className="font-semibold text-white text-lg">
            {monthNames[selectedMonth]} {selectedYear}
          </h4>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="p-2 text-gray-400 font-medium">
              {day}
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <RefreshCw className="w-6 h-6 text-purple-400 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarDays.map((day) => {
              const isSelected = day === selectedDate;
              const hasEvent = datesWithEvents.includes(day);

              return (
                <button
                  key={day}
                  onClick={() => onDateSelect(day)}
                  className={`p-2 rounded text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-purple-500 text-white"
                      : hasEvent
                      ? "text-purple-400 bg-purple-400/20 hover:bg-purple-400/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
