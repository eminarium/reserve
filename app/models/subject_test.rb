class SubjectTest < ApplicationRecord

  # DB Fields

  # applicant_id    :integer (references 'applicant' model)
  # subject_id      :integer (references 'subject' model)
  # season_id       :integer (references 'season' model)
  # test_date       :date
  # result          :float
  # notes           :text
  # user_id         :integer


  
  # Validations

  validates   :applicant_id, presence: { message: "Diňleýji hökman saýlanylmaly..." }
  validates   :subject_id, presence: { message: "Dersi hökman saýlanylmaly..." }
  validates   :season_id, presence: { message: "Synag tapgyry hökman saýlanylmaly..." }
  validates   :result, presence: { message: "Synag netijesi hökman girizilmeli..." }


  # Associations

  belongs_to :user  
  belongs_to :applicant
  belongs_to :subject
  belongs_to :season


  # Pagination params

  self.per_page = 10
end
