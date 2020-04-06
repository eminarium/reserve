json.array! @seasons do |season|
    json.(
        season, 
            :id, 
            :title, 
            :order_no,
            :start_date,
            :end_date,
            :return_deadline,
            :notes, 
            :created_at, 
            :updated_at
    )
end