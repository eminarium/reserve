class Reservation < ApplicationRecord

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
