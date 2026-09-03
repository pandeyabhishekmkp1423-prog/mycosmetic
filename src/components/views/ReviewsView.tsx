import React, { useState } from 'react';
import { Star, CheckCircle2, Filter, MessageSquarePlus, ShieldCheck, ThumbsUp, Calendar } from 'lucide-react';
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
    <div id="reviews-directory-page" className="pt-24 pb-20 bg-[#F6FAFD]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex items-center gap-2">
        <button onClick={() => onNavigate('home')} className="hover:text-[#102A43]">Home</button>
        <span>/</span>
        <span className="text-[#102A43] font-semibold">Verified Patient Reviews</span>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1769AA] block">
              Transparent Feedback
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102A43] tracking-tight">
              Verified Patient Reviews
            </h1>
            <p className="text-base text-gray-600 leading-relaxed font-normal">
              Authentic reviews and testimonials from patients treated by Dr. R. K. Mishra at SIPS Hospital Lucknow.
            </p>
          </div>

          {/* Aggregate Rating Banner & Submit Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-4 bg-white rounded-2xl border border-[#DCE7F0] flex items-center gap-4 shadow-xs">
              <div className="text-3xl font-serif font-bold text-[#102A43]">4.9</div>
              <div>
                <div className="flex text-[#C89448]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-[11px] text-gray-500">Based on 500+ Reviews</p>
              </div>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-5 py-3 bg-[#102A43] hover:bg-[#1769AA] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#C89448]" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 pt-6 border-t border-[#DCE7F0] flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedFilter(opt)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === opt
                  ? 'bg-[#102A43] text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-[#E7F2F8] border border-[#DCE7F0]'
              }`}
            >
              {opt === 'ALL' ? 'All Procedures' : opt}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DCE7F0] shadow-xs flex flex-col justify-between hover:border-[#1769AA]/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#C89448]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-600">{rev.date}</span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 bg-[#F6FAFD] text-[#1769AA] text-[11px] font-bold uppercase rounded-md border border-[#DCE7F0]">
                    {rev.procedure}
                  </span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Patient
                    </span>
                  )}
                </div>

                <h3 className="text-base font-serif font-bold text-[#102A43] mb-2">
                  {rev.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#DCE7F0] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#102A43]">{rev.author}</p>
                  <p className="text-[11px] text-gray-600">{rev.location}</p>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <ThumbsUp className="w-3.5 h-3.5 text-[#1769AA]" />
                  <span>Helpful ({rev.helpfulCount || 12})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Review Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in-95">
            <h3 className="text-xl font-serif font-bold text-[#102A43] mb-1">
              Submit Your Patient Review
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Share your surgical experience with Dr. R. K. Mishra and the SIPS Hospital medical team.
            </p>

            {submitSuccess ? (
              <div className="p-6 bg-emerald-50 text-emerald-800 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-600" />
                <p className="text-sm font-bold">Thank You!</p>
                <p className="text-xs">Your verified patient review has been recorded.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul S. or Anonymous"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-2.5 bg-[#F6FAFD] border border-[#DCE7F0] rounded-xl focus:outline-hidden focus:border-[#1769AA]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Procedure</label>
                    <select
                      value={procedure}
                      onChange={(e) => setProcedure(e.target.value)}
                      className="w-full p-2.5 bg-[#F6FAFD] border border-[#DCE7F0] rounded-xl focus:outline-hidden focus:border-[#1769AA]"
                    >
                      <option value="Rhinoplasty">Rhinoplasty</option>
                      <option value="Gynecomastia">Gynecomastia</option>
                      <option value="Liposuction">Liposuction</option>
                      <option value="Blepharoplasty">Blepharoplasty</option>
                      <option value="Tummy Tuck">Tummy Tuck</option>
                      <option value="Hair Transplant">Hair Transplant</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Rating</label>
                    <div className="flex items-center gap-1 pt-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(num)}
                          className="p-1"
                        >
                          <Star className={`w-5 h-5 ${num <= rating ? 'text-[#C89448] fill-[#C89448]' : 'text-gray-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Review Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Highly skillful surgeon and wonderful recovery experience"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 bg-[#F6FAFD] border border-[#DCE7F0] rounded-xl focus:outline-hidden focus:border-[#1769AA]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Your Detailed Experience</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your consultation, surgery day, recovery, and results..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2.5 bg-[#F6FAFD] border border-[#DCE7F0] rounded-xl focus:outline-hidden focus:border-[#1769AA]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DCE7F0]">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#102A43] hover:bg-[#1769AA] text-white font-bold rounded-xl transition-colors"
                  >
                    Post Review
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
