"use client";

import { useParams } from "next/navigation";
import EditSeriesForm from "../../../components/forms/EditSeriesForm";

const EditSeries = () => {
    const { id } = useParams();
    return(
        <div>
            <EditSeriesForm seriesId={id}/>
        </div>
    );
}
export default EditSeries;