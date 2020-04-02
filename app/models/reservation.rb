class Reservation < ApplicationRecord
  belongs_to :applicant
  belongs_to :season
  belongs_to :shift
  belongs_to :subject
end
