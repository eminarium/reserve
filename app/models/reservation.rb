class Reservation < ApplicationRecord

  # Validations

  validates :applicant_id,  presence: true
  validates :season_id,     presence: true
  validates :shift_id,      presence: true
  validates :subject_id,    presence: true
  validates :is_registered, presence: true
  validates :is_sms_sent,   presence: true
  validates :is_called,     presence: true

  # Associations
  
  belongs_to :applicant
  belongs_to :season
  belongs_to :shift
  belongs_to :subject
end
