import CalendarLogic from "./CalendarLogic";


const Calendar = () => {
  return (
    <div className="w-96 h-96 grid grid-cols-7">
      {CalendarLogic().map(({ date }, index) => {
        return (
          <div key={index}>
            <h1>{date.date()}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;