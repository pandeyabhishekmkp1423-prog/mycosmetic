import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquarePlus, ThumbsUp, X, Sparkles } from 'lucide-react';
import { reviewsData } from '../../data/reviewsData';
import { useConsultationStore } from '../../lib/consultationStore';
import { ReviewItem } from '../../types';

interface ReviewsViewProps {
  onNavigate: (route: string) => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Form State
  const [author, setAuthor] = useState('');
  const [procedure, setProcedure] = useState('Rhinoplasty');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const { reviews: storedReviews, addReview } = useConsultationStore();

  const allReviews: ReviewItem[] = [...storedReviews, ...reviewsData];

  const filterOptions = ['ALL', 'Rhinoplasty', 'Gynecomastia', 'Liposuction', 'Blepharoplasty', 'Tummy Tuck'];

  const filteredReviews = selectedFilter === 'ALL'
    ? allReviews
    : allReviews.filter(r => r.procedure.toLowerCase().includes(selectedFilter.toLowerCase()));

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment || !title) return;

    addReview({
      author,
      location: 'Verified Lucknow Patient',
      procedure,
      rating,
      title,
      content: comment,
      verified: true,
      helpfulCount: 0
    });

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowSubmitModal(false);
      setAuthor('');
      setTitle('');
      setComment('');
    }, 2000);
  };

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#F8FAFC]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs text-[#64748B] flex items-center gap-2 border-b border-[#E2E8F0] mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-[#003366] transition-colors cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-[#003366] font-semibold">Patient Reviews</span>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block mb-1">
              Independent Patient Feedback
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[#003366] tracking-tight">
              Verified Patient <span className="italic text-[#00A3E0] font-normal">Reviews</span>
            </h1>
            <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed pt-1">
              Read honest experiences from patients treated by Senior Plastic Surgeon Dr. R. K. Mishra at SIPS Super Specialty Hospital, Lucknow.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] flex items-center gap-3.5 shadow-sm">
              <div className="text-3xl font-editorial font-bold text-[#003366]">4.9</div>
              <div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#64748B] font-medium mt-0.5">500+ Verified Patient Ratings</p>
              </div>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="btn-navy text-xs sm:text-sm py-3 px-5 rounded-xl font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#00A3E0]" />
              <span>Submit a Review</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedFilter(opt)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all cursor-pointer whitespace-nowrap ${
                selectedFilter === opt
                  ? 'bg-[#003366] text-white shadow-sm'
                  : 'bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:text-[#003366]'
              }`}
            >
              {opt === 'ALL' ? 'All Procedures' : opt}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col justify-between hover:border-[#00A3E0]/40 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#64748B]">{rev.date}</span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">
                    {rev.procedure}
                  </span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-[#003366] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00A3E0]" /> Verified Patient
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-editorial font-bold text-[#003366] mb-2 leading-snug">
                  {rev.title}
                </h3>

                <p className="text-sm text-[#475569] leading-relaxed mb-4 font-normal">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <p className="font-bold text-[#003366]">{rev.author}</p>
                  <p className="text-xs text-[#64748B]">{rev.location}</p>
                </div>
                <div className="flex items-center gap-1 text-[#64748B]">
                  <ThumbsUp className="w-3.5 h-3.5 text-[#00A3E0]" />
                  <span>Helpful ({rev.helpfulCount || 12})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-[#002244]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-serif font-bold text-[#003366] mb-1">
              Submit Patient Review
            </h3>
            <p className="text-xs text-[#64748B] mb-5">
              Share your genuine surgical experience with Dr. R. K. Mishra and the SIPS Hospital team.
            </p>

            {submitSuccess ? (
              <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto text-[#00A3E0]" />
                <p className="text-sm font-bold text-[#003366]">Review Submitted</p>
                <p className="text-xs text-[#475569]">Thank you for contributing your valuable feedback.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#003366] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aditi S."
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#003366] mb-1">Procedure</label>
                    <select
                      value={procedure}
                      onChange={(e) => setProcedure(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none"
                    >
                      <option value="Rhinoplasty">Rhinoplasty</option>
                      <option value="Gynecomastia">Gynecomastia</option>
                      <option value="Liposuction">Liposuction</option>
                      <option value="Blepharoplasty">Blepharoplasty</option>
                      <option value="Facelift">Facelift</option>
                      <option value="Breast Surgery">Breast Surgery</option>
                      <option value="Tummy Tuck">Tummy Tuck</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#003366] mb-1">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none"
                    >
                      <option value={5}>5 Stars - Outstanding</option>
                      <option value={4}>4 Stars - Very Good</option>
                      <option value={3}>3 Stars - Good</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#003366] mb-1">Review Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Natural rhinoplasty result and caring hospital team"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#003366] mb-1">Your Detailed Review</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your consultation, surgery, and care at SIPS Hospital..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#003366] hover:bg-[#002244] text-white font-bold text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
