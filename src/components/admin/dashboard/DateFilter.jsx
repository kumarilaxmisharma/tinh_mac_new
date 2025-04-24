// DateRangePicker component
import { Calendar, ChevronDown } from 'lucide-react';

const DateRangePicker = ({ startDate, endDate, onDateChange }) => {
  return (

    <div className="flex items-center p-2 bg-white rounded-lg border border-gray-200">
      <Calendar className="text-gray-500 mr-2" size={16} />
      <input 
        type="date" 
        value={startDate} 
        onChange={(e) => onDateChange(e.target.value, endDate)}
        className="border-none text-sm focus:outline-none" 
      />
      <span className="mx-2 text-gray-500">to</span>
      <input 
        type="date" 
        value={endDate} 
        onChange={(e) => onDateChange(startDate, e.target.value)}
        className="border-none text-sm focus:outline-none" 
      />
      <ChevronDown className="text-gray-500 ml-2" size={16} />
    </div>
  );
};

export default DateRangePicker;