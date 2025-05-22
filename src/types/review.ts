export interface Review {
  /** Unique identifier for the review */
  id: string;
  
  /** Name of the user who left the review */
  userName: string;
  
  /** URL to the user's profile image */
  userImage?: string;
  
  /** Rating from 1 to 5 */
  rating: number;
  
  /** Review comment text */
  comment: string;
  
  /** Date when the review was posted (formatted as string, e.g. '2 days ago' or '2023-05-20') */
  date: string;
  
  /** Optional skill ID that this review is associated with */
  skillId?: string;
  
  /** Optional user ID of the reviewer */
  userId?: string;
}

export interface CreateReviewInput {
  /** Skill ID that this review is for */
  skillId: string;
  
  /** Rating from 1 to 5 */
  rating: number;
  
  /** Review comment text */
  comment: string;
  
  /** Optional user ID (if not provided, will use the current user) */
  userId?: string;
}
