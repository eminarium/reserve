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

  # Validations

  validates   :applicant_id,  
              presence: true,
              message: "Diňleýji hökman saýlanmaly..."

  validates   :season_id,     
              presence: true,
              message: "Tapgyr hökman saýlanmaly..."

  validates   :shift_id,      
              presence: true,
              message: "Wagty (Seans) hökman saýlanmaly..."

  validates   :subject_id,    
              presence: true,
              message: "Dersi hökman saýlanmaly..."

  validates   :is_registered, 
              presence: true,
              message: "Ýazylyp ýazylmandygy hökman belli edilmeli..."

  validates   :is_sms_sent,   
              presence: true,
              message: "SMS ugradylyp ugradylmandygy hökman belli edilmeli..."

  validates   :is_called,     
              presence: true,
              message: "Jaň etmek baradaky bellik hökman belli edilmeli..."

  # Associations

  belongs_to :applicant
  belongs_to :season
  belongs_to :shift
  belongs_to :subject
end
