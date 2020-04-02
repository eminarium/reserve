class SubjectTest < ApplicationRecord

  # Validations

  validates :applicant_id,  presence: true
  validates :subject_id,    presence: true
  validates :test_date,     presence: true
  validates :season_id,     presence: true
  validates :result,        presence: true


  # Associations

  belongs_to :applicant
  belongs_to :subject
  belongs_to :season
end
