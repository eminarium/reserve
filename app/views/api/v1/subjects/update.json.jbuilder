json.(
    @subject, 
        :id, 
        :title, 
        :level,
        :notes, 
        :created_at, 
        :updated_at,

        json.subject_category (
            @subject.subject_category,
                :id,
                :title,
                :is_kids,
                :notes,
                :created_at,
                :updated_at
        ),

        json.language (
            @subject.language,
                :id,
                :title,
                :notes,
                :created_at,
                :updated_at
        )
)