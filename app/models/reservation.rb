class Reservation < ApplicationRecord

  # DB Fields

  # applicant_id  :integer (references 'applicant' model)
  # season_id     :integer (references 'season' model)
  # shift_id      :integer (references 'shift' model)
  # subject_id    :integer (references 'subject' model)
  # is_registered :boolean
  # is_sms_sent   :boolean
  # is_called     :boolean
  # notes         :text
  # user_id       :integer

  
  # Validations

  validates   :applicant_id, presence: { message: "Diňleýji hökman saýlanylmaly..." }
  validates   :season_id, presence: { message: "Tapgyry hökman saýlanylmaly..." }
  validates   :shift_id, presence: { message: "Wagty (Seans) hökman saýlanylmaly..." }
  validates   :subject_id, presence: { message: "Dersi hökman saýlanylmaly..." }
  #validates   :is_registered, presence: { message: "Ýazylyp ýazylmandygy hökman belli edilmeli..." }
  #validates   :is_sms_sent, presence: { message: "SMS ugradylyp ugradylmandygy hökman belli edilmeli..." }
  #validates   :is_called, presence: { message: "Jaň etmek baradaky bellik hökman belli edilmeli..." }


  # Associations

  belongs_to :user  
  belongs_to :applicant
  belongs_to :season
  belongs_to :shift
  belongs_to :subject
end
