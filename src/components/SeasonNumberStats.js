import { classifySeriesLength } from "@/lib/services/seriesService";
import {ShortSeriesSign, MediumSeriesSign, LongSeriesSign} from "./SeasonStatRectangles"

const SeasonNumberStats = (seasons) => {
    const categoryNo = classifySeriesLength(seasons);

    if (categoryNo == 1)
    return <ShortSeriesSign />
    
    if (categoryNo == 2)
        return <MediumSeriesSign />;
    return <LongSeriesSign />;
};

export default SeasonNumberStats;