"use client";

import { useParams } from "next/navigation";
import EditSeriesForm from "../../../components/forms/EditSeriesForm";

const EditSeries = () => {
    const { id } = useParams();
    return(
        <div className="flex justify-center">
            <EditSeriesForm seriesId={id}/>
        </div>
    );
}
export default EditSeries;