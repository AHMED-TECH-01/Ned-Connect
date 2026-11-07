import {
  DashboardLink,
  ErrorState,
  HomeLink,
} from "@/components/layout/ErrorState";

export default function NotFound() {
  return (
    <ErrorState
      code="404"
      tone="brand"
      title="Page Not Found"
      description="We could not find that page. It may have been moved or the link may be incorrect."
      helpItems={[
        "Check the address for typos.",
        "Jump straight to a campus module from your dashboard.",
      ]}
      actions={
        <>
          <HomeLink />
          <DashboardLink />
        </>
      }
    />
  );
}
