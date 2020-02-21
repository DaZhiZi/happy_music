# music_player

## 项目截图
![music](music.png)

## 项目功能
一款音乐播放器。具备播放，暂停，切歌基本功能。以及 随机播放，单曲循环，循环播放 三种模式。
- 使用HTML5的新标签和API实现音乐播放器功能
- 事件监听的方式，绑定各个功能按钮。
- 使用计时器的方式，监听播放进度，实时更新播放时间进度条。
 

## 思路：
- music
    - events
        - action
          - click action 
            - music playing
            - 相应 按钮 css 改变  （change btn）
            - 换背景名字
                - img
                - text
            - color 
         
        - stop  
            
        - time
            - current_time
            - duration 总时间
            
        - prev shang
            - 获取 music_id
            - go_index
            
        - next xia
            - 获取 music_id
            - go_index
            
        - range progress
            - 给 input range 添加拖动事件
            
        - heart liked
            - toggle className
            
        - song_list
            - click 显示 song_list
            - click song
                - 获取 music_id
                - go_index
                
        - 默认 cycle
            - 获取 music_id
            - 计算 下一个 id
            - goIndex(newIndex)
        