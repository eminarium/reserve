class Subject < ApplicationRecord

  # Validations

  validates :title,               length: { minimum: 3 }, presence: true
  validates :level,               numericality: { only_integer: true}, presence: true
  validates :subject_category_id, presence: true
  validates :language_id,         presence: true

  # Associations

  belongs_to :subject_category
  belongs_to :language
end
