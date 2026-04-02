import { useMemo } from "react";
import Card from "../common/Card";
import { useTransactions } from "../../hooks/useTransactions";
import { getSmartObservations } from "../../utils/insightCalculations";

export default function SmartObservations() {
  const { transactions } = useTransactions();
  const observations = useMemo(
    () => getSmartObservations(transactions),
    [transactions]
  );

  return (
    <Card>
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Smart Observations
      </h3>
      <ul className="space-y-3">
        {observations.map((obs, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{obs}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
