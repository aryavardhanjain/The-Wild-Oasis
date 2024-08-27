import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // * 1.
  const numBookings = bookings.length;

  // * 2.
  const sales = bookings.reduce((acc, cur) => acc + cur.total_price, 0);

  // * 3.
  const checkins = confirmedStays.length;

  // * 4.
  // * It will num of checked in nights / all available nights (Ex: 7 days, 30 days, 90 days etc.) (formula: num_days * num_cabins)
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.num_nights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
