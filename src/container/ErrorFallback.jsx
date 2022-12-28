import { ErrorBoundary } from "react-error-boundary";

export function ErrorFallback({ error, componentStack, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <pre>{error.componentStack}</pre>
    </div>
  );
}
