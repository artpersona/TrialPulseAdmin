import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import SwiperCardsHome from "./SwiperCardsHome";
import SwiperNewSponsors from "./SwiperNewSponsors";
import {options, data} from "../../shared/utils/chart.utitlity"
import {a, b, c} from "../../shared/utils/dashboardSample.utility"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  return (
    <div className="container h-full w-full">
      <section className="flex justify-between space-x-5 bg-white p-4">
        {a.map((item, i) => {
          return (
            <article key={i} className="flex flex-col space-y-2 items-center">
              <h3>{item.title}</h3>
              <h1 className="text-green-light font-bold">{item.n}</h1>
              <Bar className="w-[100px]" options={options} data={data}/>
              <figure className="border-[5px] rounded-full border-gray-primary bg-gray-primary w-full"/>
              <p>{item.chart} in {item.days} days</p>
            </article>
          )
        })}
      </section>

      <section className='border-t-2 border-t-gray-light py-4'>
        <h4 className="text-gray-primary">Recently Viewed</h4>
        <SwiperCardsHome data={b} type="recentlyViewed"/>
      </section>

      <section className='border-t-2 border-t-gray-light py-4'>
        <h4 className="text-gray-primary">New Studies</h4>
        <SwiperCardsHome data={b} type="newStudies"/>
      </section>

      <section className='border-t-2 border-t-gray-light py-4'>
        <h4 className="text-gray-primary">New Sponsors</h4>
        <SwiperNewSponsors data={c} type="newStudies"/>
      </section>
      
    </div>
  );
}

 {/* <DashboardItem
        title={"Protocol"}
        icon={<BsJournalMedical size={50} color="#5AC8FA" />}
        path="/protocols"
      />
      <DashboardItem
        title={"Sponsors"}
        icon={<FaRegHandshake size={50} color="#5AC8FA" />}
        path="/sponsors"
      />
      <DashboardItem
        title={"Sites"}
        icon={<MdLocationPin size={50} color="#5AC8FA" />}
        path="/sites"
      />
      <DashboardItem
        title={"Messages"}
        icon={<BsChatLeftDotsFill size={50} color="#5AC8FA" />}
        path="/messages"
      /> */}