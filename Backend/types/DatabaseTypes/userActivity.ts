export interface UserActivityKey{
  id: number
}
export interface UserActivity extends UserActivityKey{
  userId: number,
  activityId: number;
}
