class SubjectTest < ApplicationRecord
  belongs_to :applicant
  belongs_to :subject
  belongs_to :season
end
