class Mentor::TestimonialsController < ApplicationController
  def index
    # TODO: - Paginate
    @testimonials = current_user.mentor_testimonials.to_a * 10
    @num_total_testimonials = current_user.mentor_testimonials.count
  end
end
