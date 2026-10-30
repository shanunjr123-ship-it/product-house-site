// Customer reviews. Only paste reviews that real customers actually posted on Google.
// Nothing on the site is invented: while REVIEWS is empty and REVIEW_LINK is empty, the section is not shown at all.
//
// 1. Get the review link: Google Business Profile > "Get more reviews" > copy the short link (g.page/r/.../review).
//    Put it in REVIEW_LINK. The section then shows an invitation with a "Rate us on Google" button.
// 2. When real reviews exist, copy each one here exactly as the customer wrote it (same wording, same rating).
//    Do not shorten, reword or translate it into a claim the customer did not make.
//
// These reviews are displayed as content only. They are not marked up as schema.org Review/AggregateRating:
// Google ignores self-hosted reviews of your own business, and wrong markup risks a manual action.
// The reviews that count for ranking are the ones on the Google Business Profile itself.

export type ReviewDef = {
  author: string; // as shown on Google, e.g. "Abdullah A."
  rating: 1 | 2 | 3 | 4 | 5;
  text: string; // original wording, in whichever language the customer wrote it
  lang: "ar" | "en";
  date: string; // YYYY-MM-DD, as shown on Google
};

export const REVIEW_LINK = ""; // CONFIRM: paste the Google "write a review" link here
export const REVIEWS: ReviewDef[] = [];
