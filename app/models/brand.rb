class Brand < ActiveRecord::Base

  before_create :set_uuid
  after_create :send_update_email

  validates_uniqueness_of :email
  # validates :email, uniqueness: true, on: :update

  def set_uuid
    self.retrieval_key = SecureRandom.uuid
  end

  def send_update_email
    UpdateEmail.update_answer(self, self.email).deliver
  end

end
