import { JWT } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];

let client: JWT | null = null;

function getClient(): JWT {
  if (client) return client;

  const email = process.env.GA4_CLIENT_EMAIL;
  const key = process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !key) {
    throw new Error("Missing GA4_CLIENT_EMAIL or GA4_PRIVATE_KEY env vars");
  }

  client = new JWT({ email, key, scopes: SCOPES });
  return client;
}

export type Ga4OrderBy =
  | { dimension: { dimensionName: string } }
  | { metric: { metricName: string }; desc?: boolean };

export type Ga4ReportRequest = {
  dimensions?: string[];
  metrics: string[];
  dateRanges: { startDate: string; endDate: string }[];
  orderBys?: Ga4OrderBy[];
  limit?: number;
};

export type Ga4ReportRow = { dims: string[]; metrics: string[] };

type Ga4ApiResponse = {
  rows?: {
    dimensionValues?: { value: string }[];
    metricValues?: { value: string }[];
  }[];
};

// Chama a Google Analytics Data API (GA4) via REST, autenticado com a Service Account
// configurada em GA4_CLIENT_EMAIL/GA4_PRIVATE_KEY. Usa google-auth-library (leve, via fetch)
// em vez do client oficial @google-analytics/data, que traz gRPC e pesa no bundle serverless.
export async function runGa4Report(request: Ga4ReportRequest): Promise<Ga4ReportRow[]> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) {
    throw new Error("Missing GA4_PROPERTY_ID env var");
  }

  const response = await getClient().request<Ga4ApiResponse>({
    url: `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    method: "POST",
    data: {
      dimensions: request.dimensions?.map((name) => ({ name })),
      metrics: request.metrics.map((name) => ({ name })),
      dateRanges: request.dateRanges,
      orderBys: request.orderBys,
      limit: request.limit,
    },
  });

  return (response.data.rows ?? []).map((row) => ({
    dims: (row.dimensionValues ?? []).map((v) => v.value),
    metrics: (row.metricValues ?? []).map((v) => v.value),
  }));
}
