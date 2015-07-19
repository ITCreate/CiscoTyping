# CiscoTyping  ![nightmare](https://github.com/shiv3/CiscoTyping/blob/master/image/monster/1.png)

###Ciscoのコマンドを学習できるタイピングゲームです！


- Game Mode
	- Survival
	- Battle Mode *未実装*
		
	- Farm
- Study Mode

- Setting 
	*未実装*


# コマンド一覧

| コマンド名                                | 説明 |
| ---                                      | --- |
| enable                                   | 特権モードへ移動する |
| enable password                          | イネーブルパスワードを設定する |
| enable secret                            | イネーブルパスワードを暗号化する |
| show running-config                      | コンフィグを表示する |
| copy runnung-config startup-config       | 現在の設定を保存する |
| show ip route                            | ルーティングテーブルを表示する |
| show clock                               | 時刻を表示する |
| show version                             | ルータのいろいろな情報を表示する |
| show logging                             | ルータが認識したイベントを表示する |
| show arp                                 | ARP cache（アープキャッシュ）を表示する |
| show flash                               | flashメモリ情報を表示する |
| show environment                         | ルータのおかれた環境を表示する |
| show processes cpu                       | 各プロセスのcpu使用率を表示する |
| show processes memory                    | 各プロセスのメモリを表示する |
| show tech-support                        | ルータのシステム情報を表示する |
| show diag                                | モジュール情報を表示する |
| show cdp neighbors                       | CDPを利用して隣接ルータの情報を確認する |
| show interfaces                          | インターフェイスの状態を表示する |
| sho ip interfece brief                   | インターフェイスの状態をシンプルに表示する |
| no shutdown                              | インターフェイスを立ち上げる |
| configure terminal                       | グローバルコンフィグレーションモードへ移動する |
| terminal length 0                        | 表示する行の長さを決定する |
| line vty 0 4                             | line vtyにパスワードを設定する |
| logging x.x.x.x                          | ログサーバを指定 |
| logging buffred 8192 debugging           | ログをバッファに入れるようにする |
| ping x.x.x.x                             | x.x.x.x宛ての疎通確認をする |
| 拡張ping                                 | 疎通確認をする |
| traceroute x.x.x.x                       | 通信経路の確認 |
| reload                                   | ルータを再起動する |
| clock timezone JST 9                     | タイムゾーンを日本時間にする |
| ip nat inside source static              | 静的NATの設定 |
| ip nat inside source list 1 pool         | 動的NATの設定 |
| access-list ~ deny x.x.x.x               | アクセスリストを定義する |
| ip access-group ~ in                     | アクセスリストをインターフェイスに適用する |
| router rip                               | リップを設定する |
| version 2                                | リップバージョン２を設定する |
| router eigrp [1~65535]                   | EIGRPを設定する |
| no auto-summary                          | 自動集約を無効にする |
| passive-interface                        | インターフェイスをパッシブにする |
| router ospf [1~65535]                    | OSPFを設定する |
| log-adjacency-changes                    | OSPFルータの隣接関係のログが出るようにする |
| redistribute ~                           | 再配信の設定 |
| encapsulation frame-relay                | インターフェイスをフレームリレーでカプセルする |
| clear ip route *                         | ルーティングテーブルをクリア |
| no cdp run                               | CDPを無効にする |
| encapsulation ppp                        | インターフェイスをpppでカプセル化する |
| ppp authentication chap                  | pppで暗号化の認証をさせる |
| banner motd                              | バナーの設定 |
| speed auto                               | インターフェイスの速度を変更する |
| duplex auto                              | インターフェイスのduplexを変更する |
| aaa new-model                            | 認証機能を設定する |
| no ip domain-lookup                      | ドメイン名からの名前解決サービスを止める |
| isdn switch-type ntt                     | スイッチタイプをnttに設定する |
| ntp server x.x.x.x                       | NTPサーバのアドレスを指定する |
| service compress-config                  | コンフィグを圧縮する |
| ip tcp header-compression                | TCPヘッダー圧縮をする |
| clock set                                | 日時を設定する |
| copy flash tftp                          | flashメモリからtftpサーバへコピーする |
| copy tftp flash                          | tftpサーバからflashメモリへコピーする |
