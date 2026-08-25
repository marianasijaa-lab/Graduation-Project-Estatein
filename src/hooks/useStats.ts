import { useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { realtimeDb } from '../firebase/config';
import { useAppDispatch, useAppSelector } from '../store';
import { setStats, setStatsLoading, setStatsError } from '../store/slices/statsSlice';
import type { Stat } from '../store/types';

const FALLBACK_STATS: Stat[] = [
  { value: '200+',  label: 'Happy Customers' },
  { value: '10K+',  label: 'Properties For Clients' },
  { value: '16+',   label: 'Years of Experience' },
];

export function useStats() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.stats);

  useEffect(() => {
    // إذا لم يكن Firebase مهيأً (env vars مفقودة) نستخدم البيانات الافتراضية
    if (!realtimeDb) {
      dispatch(setStats(FALLBACK_STATS));
      return;
    }

    // بدء الاستماع للتحديثات الفورية
    dispatch(setStatsLoading());
    const statsRef = ref(realtimeDb, 'stats/');

    const unsubscribe = onValue(
      statsRef,
      (snapshot) => {
        const raw = snapshot.val();
        // إذا كانت البيانات فارغة (null) نحتفظ بالقيم الأخيرة المعروفة
        if (raw === null) return;
        const stats: Stat[] = Array.isArray(raw) ? raw : Object.values(raw);
        dispatch(setStats(stats));
      },
      (err) => {
        dispatch(setStatsError(err.message));
      }
    );

    // تنظيف عند unmount — يمنع تسرّب الذاكرة
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return { stats: data, status, error };
}
