class SubjectTest < ApplicationRecord

  # DB Fields

  # applicant_id    :integer (references 'applicant' model)
  # subject_id      :integer (references 'subject' model)
  # season_id       :integer (references 'season' model)
  # test_date       :date
  # result          :float
  # notes           :text

  
  # Validations

  validates   :applicant_id,  
              presence: true,
              message: "Diňleýji hökman saýlanylmaly..."

  validates   :subject_id,    
              presence: true,
              message: "Dersi hökman saýlanylmaly..."

  validates   :test_date,     
              presence: true,
              message: "Synag senesi hökman saýlanylmaly..."

  validates   :season_id,     
              presence: true
              message: "Synag tapgyry hökman saýlanylmaly..."

  validates   :result,        
              presence: true,
              message: "Synag netijesi hökman girizilmeli..."


  # Associations

  belongs_to :applicant
  belongs_to :subject
  belongs_to :season
end
