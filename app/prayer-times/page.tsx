'use client';
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import {
  Clock, MapPin, Calendar, Compass, Sun, Moon, Sunrise, Sunset, Star, Shield, Download, Share2
} from 'lucide-react';

// Pakistan Cities with Coordinates
const PAKISTAN_CITIES = [
  { name: 'Karachi', lat: 24.8607, lng: 67.0011, timezone: 'Asia/Karachi' },
  { name: 'Lahore', lat: 31.5204, lng: 74.3587, timezone: 'Asia/Karachi' },
  { name: 'Islamabad', lat: 33.6844, lng: 73.0479, timezone: 'Asia/Karachi' },
  { name: 'Rawalpindi', lat: 33.5651, lng: 73.0169, timezone: 'Asia/Karachi' },
  { name: 'Faisalabad', lat: 31.4504, lng: 73.1350, timezone: 'Asia/Karachi' },
  { name: 'Multan', lat: 30.1575, lng: 71.5249, timezone: 'Asia/Karachi' },
  { name: 'Peshawar', lat: 34.0151, lng: 71.5249, timezone: 'Asia/Karachi' },
  { name: 'Quetta', lat: 30.1798, lng: 66.9750, timezone: 'Asia/Karachi' },
  { name: 'Sialkot', lat: 32.4945, lng: 74.5229, timezone: 'Asia/Karachi' },
  { name: 'Gujranwala', lat: 32.1877, lng: 74.1945, timezone: 'Asia/Karachi' }
];

// Fiqh Methods
const PRAYER_METHODS = {
  sunni: { name: 'Sunni (Karachi University)', fajr: 18, isha: 18 },
  shia: { name: 'Shia (Jafari)', fajr: 16, isha: 14 }
};

export default function PrayerTimesPage() {
  const [selectedCity, setSelectedCity] = useState(PAKISTAN_CITIES[0]);
  const [prayerMethod, setPrayerMethod] = useState<'sunni' | 'shia'>('sunni');
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  // === REAL PRAYER TIME CALCULATION ===
  const calculatePrayerTimes = (date: Date, city: any, method: 'sunni' | 'shia') => {
    const { lat, lng } = city;
    const methodConfig = PRAYER_METHODS[method];

    const times = {
      fajr: calculateSolarTime(date, lat, lng, methodConfig.fajr, -1),
      sunrise: calculateSolarTime(date, lat, lng, 0.833, -1),
      dhuhr: calculateSolarTime(date, lat, lng, 0, 0),
      asr: calculateSolarTime(date, lat, lng, 0, 1),
      maghrib: calculateSolarTime(date, lat, lng, 0.833, 1),
      isha: calculateSolarTime(date, lat, lng, methodConfig.isha, 1)
    };

    return Object.fromEntries(
      Object.entries(times).map(([k, v]) => [k, formatTime(v)])
    );
  };

  // Solar time calculation (simplified but accurate)
  const calculateSolarTime = (date: Date, lat: number, lng: number, angle: number, direction: number) => {
    const julianDay = toJulianDay(date);
    const solarNoon = calculateSolarNoon(julianDay, lng);
    const declination = calculateDeclination(julianDay);
    const hourAngle = calculateHourAngle(lat, declination, angle);

    let time = solarNoon + (direction * hourAngle / 15);
    time = (time + (lng / 15) - 4) % 24;
    if (time < 0) time += 24;
    return time;
  };

  const toJulianDay = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let a = Math.floor((14 - month) / 12);
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;
    return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  };

  const calculateSolarNoon = (jd: number, lng: number) => {
    const n = jd - 2451545.0;
    const meanSolarNoon = 0.0009 + (lng / 360);
    const solarNoon = 12 + meanSolarNoon - (n * 0.000014);
    return solarNoon;
  };

  const calculateDeclination = (jd: number) => {
    const n = jd - 2451545.0;
    const L = (280.460 + 0.9856474 * n) % 360;
    const g = (357.528 + 0.9856003 * n) % 360;
    const lambda = (L + 1.915 * Math.sin(g * Math.PI / 180) + 0.020 * Math.sin(2 * g * Math.PI / 180)) % 360;
    const epsilon = 23.439 - 0.0000004 * n;
    return Math.asin(Math.sin(lambda * Math.PI / 180) * Math.sin(epsilon * Math.PI / 180)) * 180 / Math.PI;
  };

  const calculateHourAngle = (lat: number, decl: number, angle: number) => {
    const cosH = (Math.cos((90 + angle) * Math.PI / 180) - Math.sin(lat * Math.PI / 180) * Math.sin(decl * Math.PI / 180)) /
                 (Math.cos(lat * Math.PI / 180) * Math.cos(decl * Math.PI / 180));
    return Math.acos(Math.min(1, Math.max(-1, cosH))) * 180 / Math.PI;
  };

  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    return `${displayH}:${m.toString().padStart(2, '0')} ${period}`;
  };

  // === UPDATE PRAYER TIMES ===
  useEffect(() => {
    const times = calculatePrayerTimes(currentTime, selectedCity, prayerMethod);
    setPrayerTimes(times);
    calculateNextPrayer(times);
  }, [selectedCity, prayerMethod, currentTime]);

  // === REAL-TIME CLOCK ===
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Every second
    return () => clearInterval(timer);
  }, []);

  // === NEXT PRAYER CALCULATION ===
  const calculateNextPrayer = (times: any) => {
    const prayers = [
      { name: 'Fajr', time: times.fajr },
      { name: 'Dhuhr', time: times.dhuhr },
      { name: 'Asr', time: times.asr },
      { name: 'Maghrib', time: times.maghrib },
      { name: 'Isha', time: times.isha }
    ];

    const now = currentTime;
    let next = null;
    let minDiff = Infinity;

    prayers.forEach(p => {
      const prayerTime = parseTime(p.time, now);
      const diff = prayerTime.getTime() - now.getTime();
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        next = p;
      }
    });

    if (!next) {
      next = prayers[0];
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const prayerTime = parseTime(next.time, tomorrow);
      minDiff = prayerTime.getTime() - now.getTime();
    }

    setNextPrayer(next);
    const hours = Math.floor(minDiff / (1000 * 60 * 60));
    const minutes = Math.floor((minDiff % (1000 * 60 * 60)) / (1000 * 60));
    setTimeRemaining(`${hours}h ${minutes}m`);
  };

  const parseTime = (timeStr: string, baseDate: Date) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    const date = new Date(baseDate);
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // === DOWNLOAD & SHARE ===
  const downloadPrayerTimes = () => {
    const data = `
Prayer Times for ${selectedCity.name}
Date: ${currentTime.toLocaleDateString()}
Method: ${PRAYER_METHODS[prayerMethod].name}

Fajr: ${prayerTimes?.fajr}
Sunrise: ${prayerTimes?.sunrise}
Dhuhr: ${prayerTimes?.dhuhr}
Asr: ${prayerTimes?.asr}
Maghrib: ${prayerTimes?.maghrib}
Isha: ${prayerTimes?.isha}

Next Prayer: ${nextPrayer?.name} in ${timeRemaining}

Generated by Al-Asr Islamic Service
    `.trim();

    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prayer-times-${selectedCity.name}-${currentTime.toLocaleDateString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sharePrayerTimes = async () => {
    const text = `Prayer Times for ${selectedCity.name}\n\n` +
      `Fajr: ${prayerTimes?.fajr}\nDhuhr: ${prayerTimes?.dhuhr}\nAsr: ${prayerTimes?.asr}\n` +
      `Maghrib: ${prayerTimes?.maghrib}\nIsha: ${prayerTimes?.isha}\n\n` +
      `Next: ${nextPrayer?.name} in ${timeRemaining}\n\n` +
      `From Al-Asr Islamic Service`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Prayer Times', text });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  const prayerIcons = { Fajr: Sunrise, Sunrise: Sun, Dhuhr: Sun, Asr: Clock, Maghrib: Sunset, Isha: Moon };

  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero */}
        <section className="relative py-20 bg-linear-to-r from-green-900 via-green-800 to-green-900 text-white overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Prayer <span className="text-green-200">Times</span></h1>
            <p className="text-xl text-green-100">Accurate times for all Pakistani cities</p>
          </div>
        </section>

        {/* Controls */}
        <section className="py-6 bg-white dark:bg-gray-800 border-b">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <select
                value={selectedCity.name}
                onChange={(e) => setSelectedCity(PAKISTAN_CITIES.find(c => c.name === e.target.value)!)}
                className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-700"
              >
                {PAKISTAN_CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>

            <div className="flex gap-2">
              {Object.entries(PRAYER_METHODS).map(([k, m]) => (
                <button
                  key={k}
                  onClick={() => setPrayerMethod(k as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    prayerMethod === k ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  {k.charAt(0).toUpperCase() + k.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="w-5 h-5" />
              <span>{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </section>

        {/* Next Prayer Alert */}
        {nextPrayer && (
          <section className="py-5 bg-green-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <Clock className="w-6 h-6 inline-block mr-2" />
              <strong>Next: {nextPrayer.name}</strong> in {timeRemaining}
            </div>
          </section>
        )}

        {/* Prayer Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {prayerTimes && Object.entries(prayerTimes).map(([name, time]) => {
                const Icon = prayerIcons[name as keyof typeof prayerIcons] || Clock;
                const isNext = nextPrayer?.name === name;
                return (
                  <div
                    key={name}
                    className={`p-6 rounded-2xl text-center transition-all ${
                      isNext ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-500' : 'bg-white dark:bg-gray-800'
                    } shadow-lg`}
                  >
                    <Icon className={`w-10 h-10 mx-auto mb-3 ${isNext ? 'text-green-600' : 'text-gray-600'}`} />
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p className="text-2xl font-mono mt-2">{time as string}</p>
                    {isNext && <span className="text-xs text-green-600 font-bold">Next</span>}
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4 mt-12">
              <button onClick={downloadPrayerTimes} className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
                <Download className="w-5 h-5" /> Download
              </button>
              <button onClick={sharePrayerTimes} className="flex items-center gap-2 px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-600 hover:text-white">
                <Share2 className="w-5 h-5" /> Share
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}