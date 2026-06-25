import { redirect } from "next/navigation";

type BillingRedirectPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BillingRedirectPage({ searchParams }: BillingRedirectPageProps) {
  const resolvedParams = await searchParams;
  const params = new URLSearchParams();

  Object.entries(resolvedParams ?? {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
      return;
    }
    if (typeof value === "string") {
      params.set(key, value);
    }
  });

  const query = params.toString();
  redirect(query ? `/transcription/billing?${query}` : "/transcription/billing");
}
