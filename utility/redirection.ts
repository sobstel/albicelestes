import { NextPageContext } from "next";

type RedirectProps = {
  req: NextPageContext["req"];
  res: NextPageContext["res"];
  pattern: RegExp;
  targetUrl: (params: { [key: string]: string }) => string;
};

function redirect({ req, res, pattern, targetUrl }: RedirectProps) {
  if (req && req.url && res && res.statusCode === 404) {
    const regexMatch = req.url.match(pattern);
    if (regexMatch && regexMatch.groups) {
      res
        .writeHead(308, "Permanent Redirect", {
          Location: targetUrl(regexMatch.groups),
        })
        .end();
    }
  }
}

export function createContextRedirect(
  req: RedirectProps["req"],
  res: RedirectProps["res"]
) {
  return (
    pattern: RedirectProps["pattern"],
    targetUrl: RedirectProps["targetUrl"]
  ) => {
    return redirect({ req, res, pattern, targetUrl });
  };
}
