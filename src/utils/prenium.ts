export interface UserSubscription {
    isPremium: boolean;
    expiresAt: Date | null;
  }
  
  export const premiumFeatures = {
    unlimitedSwipes: 'Swipes illimités',
    seeWhoLikedYou: 'Voir qui vous a liké',
    advancedFilters: 'Filtres de recherche avancés',
    boostProfile: 'Boost de profil mensuel',
    superLikes: '5 Super Likes par jour',
  };
  
  export function checkPremiumStatus(user: UserSubscription): boolean {
    if (!user.isPremium) return false;
    if (!user.expiresAt) return true;
    return new Date() < user.expiresAt;
  }
  
  export function getRemainingDays(expiresAt: Date | null): number {
    if (!expiresAt) return 0;
    const now = new Date();
    const diffTime = expiresAt.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }