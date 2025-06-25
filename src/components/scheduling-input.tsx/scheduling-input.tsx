"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import moment from "moment"
import { ptBR } from "react-day-picker/locale"

const timeOptions = ["08:00 - 12:00", "08:00 - 19:00", "12:00 - 15:00", "12:00 - 18:00", "15:00 - 18:00"]

export interface SchedulingData {
  date?: Date
  time?: string
}

export interface SchedulingInputProps {
  date?: Date
  time?: string
  onChange?: (data: SchedulingData) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function SchedulingInput({
  date,
  time,
  onChange,
  placeholder = "Selecionar data e horário",
  disabled = false,
  className = "",
}: SchedulingInputProps) {
  const handleDateChange = (newDate?: Date) => {
    onChange?.({ date: newDate, time })
  }

  const handleTimeChange = (newTime: string) => {
    onChange?.({ date, time: newTime })
  }

  return (
      <Popover>
          <PopoverTrigger asChild>
              <Button
                  variant="outline"
                  className={`h-12 w-full text-sm justify-start text-left font-normal ${className}`}
                  disabled={disabled}
              >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date && time
                      ? `${moment(date).format('DD MMM YYYY')} - ${time}`
                      : placeholder}
              </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
              <div className="flex">
                  <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      disabled={(d) => d < moment().startOf('day').toDate()}
                      locale={ptBR}
                      className="rounded-md border-r"
                  />
                  <div className="p-3 border-l">
                      <div className="text-sm font-medium mb-3">
                          Horários disponíveis
                      </div>
                      <div className="grid gap-2 min-w-[140px]">
                          {timeOptions.map((t, index) => (
                              <Button
                                  key={index}
                                  variant={t === time ? 'default' : 'outline'}
                                  size="sm"
                                  className="justify-start text-xs"
                                  onClick={() => handleTimeChange(t)}
                                  type="button"
                              >
                                  {t}
                              </Button>
                          ))}
                      </div>
                  </div>
              </div>
          </PopoverContent>
      </Popover>
  );
}
