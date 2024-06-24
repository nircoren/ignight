import React from "react";

function Rating() {
  return (
    <div className="rating rating-sm pointer-events-none">
    <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
    <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500"  />
    <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
    <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
    <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" defaultChecked/>
  </div>
  );
}

export default Rating;
