import RealTimeChart from "./PieChart";

const GenreChart = ({data}) =>{

    return(
        <div className="flex justify-center my-5">
            <RealTimeChart statData={data}/>
        </div>
    );
};
export default GenreChart;