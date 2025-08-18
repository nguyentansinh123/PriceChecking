import React, { useState } from "react";

interface TagsProps {
  tags: string[];
  onTagSelect?: (tag: string | null) => void;
}

const Tags: React.FC<TagsProps> = ({ tags, onTagSelect }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>("Low fat");

  const handleTagClick = (tag: string) => {
    const newSelectedTag = selectedTag === tag ? null : tag;
    setSelectedTag(newSelectedTag);
    if (onTagSelect) {
      onTagSelect(newSelectedTag);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
            selectedTag === tag
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default Tags;
