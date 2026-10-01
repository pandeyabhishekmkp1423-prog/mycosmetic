/**
 * Hospital Calling Desk Schedule & Live Status Utility
 * Availability: 10:00 AM to 5:00 PM, Monday through Saturday (IST)
 */

export const CALL_PHONE_DISPLAY = '+91 9795 800 800';
export const CALL_PHONE_RAW = '+919795800800';
export const CALL_PHONE_HREF = 'tel:+919795800800';
export const CALL_SCHEDULE_TEXT = '10:00 AM – 5:00 PM (Mon – Sat)';
export const CALL_SCHEDULE_FULL = '10:00 AM to 5:00 PM, Monday to Saturday';

export interface CallDeskStatus {
  isOpen: boolean;
  statusLabel: string;
  badgeClass: string;
  nextOpenNotice: string;
}

export function getCallDeskStatus(): CallDeskStatus {
  try {
    // Determine Indian Standard Time (IST)
    const now = new Date();
    const istString = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const istDate = new Date(istString);
    
    const day = istDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hours = istDate.getHours();
    const minutes = istDate.getMinutes();
    const currentTimeVal = hours + minutes / 60;

    const isMonToSat = day >= 1 && day <= 6;
    const isWithinHours = currentTimeVal >= 10 && currentTimeVal < 17;

    if (isMonToSat && isWithinHours) {
      return {
        isOpen: true,
        statusLabel: 'Lines Open Now',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        nextOpenNotice: 'Phone lines active until 5:00 PM today'
      };
    } else {
      return {
        isOpen: false,
        statusLabel: 'Call Desk: 10 AM – 5 PM (Mon–Sat)',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
        nextOpenNotice: day === 0 
          ? 'Call desk opens Monday at 10:00 AM (WhatsApp available 24/7)'
          : currentTimeVal < 10
            ? 'Call desk opens at 10:00 AM today (WhatsApp available 24/7)'
            : 'Call desk opens tomorrow at 10:00 AM (WhatsApp available 24/7)'
      };
    }
  } catch (err) {
    return {
      isOpen: true,
      statusLabel: 'Available 10 AM – 5 PM (Mon–Sat)',
      badgeClass: 'bg-blue-50 text-[#003366] border-blue-200',
      nextOpenNotice: 'Monday through Saturday, 10:00 AM to 5:00 PM'
    };
  }
}
