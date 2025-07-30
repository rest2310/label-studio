import { inject } from "mobx-react";
import React from "react";
// Reuse the main app's spinner to avoid maintaining multiple loader styles
import { Spinner as UISpinner } from "../../../../../apps/labelstudio/src/components/Spinner/Spinner";

const injector = inject(({ store }) => {
  return {
    SDK: store?.SDK,
  };
});

export const Spinner = injector(({ SDK, visible = true, stopped = false, className, style, ...props }) => {
  const size = React.useMemo(() => {
    if (typeof props.size === "number") return props.size;

    if (!isNaN(Number(props.size))) return Number(props.size);

    switch (props.size) {
      case "large":
        return SDK?.spinnerSize?.large ?? 128;
      case "middle":
        return SDK?.spinnerSize?.middle ?? 48;
      case "small":
        return SDK?.spinnerSize?.small ?? 24;
      default:
        return SDK?.spinnerSize?.middle ?? 48;
    }
  }, [props.size]);

  const ExternalSpinner = SDK?.spinner;

  if (!visible) return null;

  return ExternalSpinner ? (
    <ExternalSpinner size={size} className={className} style={style} {...props} />
  ) : (
    <UISpinner size={size} stopped={stopped} className={className} style={style} {...props} />
  );
});
