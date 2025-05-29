import { Suspense } from "react";
import MySeries from "../../components/MySeries";

export default function MySeriesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MySeries />
    </Suspense>
  );
}
