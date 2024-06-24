import React from "react";

function AvatarGroup() {
  const prefix = "couples";
  const couples = Array(4).fill(0);
  return (
    <div className="inline-block avatar-group -space-x-6 rtl:space-x-reverse">
      {couples.map((couple, index) => (
        <div className="avatar">
          <div className="w-12">
            <img src={`@/../${prefix}/${prefix + (index + 1)}.jpg`} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AvatarGroup;
