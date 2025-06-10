import { useRouter } from "next/router";

export default function TagFilter({
  tags,
  selectedTag,
}: {
  tags: string[];
  selectedTag: string;
}) {
  const router = useRouter();

  const updateURL = (key: string, value: string) => {
    const params = new URLSearchParams(router.asPath.split("?")[1] || "");

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push({
      pathname: router.pathname,
      query: Object.fromEntries(params),
    });
  };

  return (
    <select
      value={selectedTag}
      onChange={(e) => updateURL("tag", e.target.value)}
    >
      <option value="">All Tags</option>
      {tags.map((tag, i) => (
        <option key={i} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  );
}
