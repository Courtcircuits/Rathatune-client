import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import Button from "./Button";

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (<div className="flex items-center justify-center flex-col h-screen">
      <h1 className="heading-1 pb-5">Oops {error.status}</h1>
      <h2 className="font-fun text-3xl">{error.statusText}</h2>
      <img src="https://media.tenor.com/aaEMtGfZFbkAAAAi/rat-spinning.gif" alt="rat" />
      {
        <Link to="/" className="w-1/4 py-10">
          <Button type="primary">
            Go home
          </Button>
        </Link>
      }
    </div>);
  } else {
    return <div>
      <h1>Oops</h1>
      {
        <div className="w-1/4 py-10">
          <Button type="primary">
            <Link to="/">Go home</Link>
          </Button>
        </div>
      }
    </div>
  }
}
